import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Typography,
    Box,
    TablePagination,
    Autocomplete,
    TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { list as getProducts } from '../../api/product/ProductApi'; // 產品API
import { list as getSuppliers } from '../../api/supplier/SupplierApi'; // 供應商API

const ProductListPage: React.FC = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<any[]>([]);
    const [suppliersMap, setSuppliersMap] = useState<Map<string, string>>(new Map());
    const [searchOptions, setSearchOptions] = useState<any[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [fetchedProducts, fetchedSuppliers] = await Promise.all([
                    getProducts(),
                    getSuppliers(),
                ]);

                // 修改供應商 Map 格式，指定類型為 Map<string, string>
                const supplierMap: Map<string, string> = new Map(
                    fetchedSuppliers.map((supplier: { id: string; name: string }) => [
                        supplier.id,
                        supplier.name,
                    ])
                );
                setSuppliersMap(supplierMap);

                // 設置產品資料
                setProducts(fetchedProducts);

                // 設置下拉選單選項
                const options = fetchedProducts.map((product: any) => ({
                    label: product.name,
                    id: product.id,
                }));
                setSearchOptions(options);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom>
                產品列表
            </Typography>
            <Box display="flex" justifyContent="space-between" gap={2} mb={2}>
                {/* Autocomplete 下拉選單 */}
                <Autocomplete
                    options={searchOptions}
                    getOptionLabel={(option) => option.label}
                    onChange={(event, value) => setSelectedProduct(value?.id || null)}
                    renderInput={(params) => (
                        <TextField {...params} variant="outlined" placeholder="搜尋產品" />
                    )}
                    sx={{ width: '100%' }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/supplier/products/add')}
                >
                    新增產品
                </Button>
            </Box>
            <TableContainer component={Paper} style={{ overflowX: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>產品ID</TableCell>
                            <TableCell>名稱</TableCell>
                            <TableCell>供應商名稱</TableCell>
                            <TableCell>單位</TableCell>
                            <TableCell>單價</TableCell>
                            <TableCell>數量</TableCell>
                            <TableCell>備註</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products
                            .filter((product) =>
                                !selectedProduct || product.id === selectedProduct
                            )
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>{product.id}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{suppliersMap.get(product.supplierId) ?? '未知供應商'}</TableCell>
                                    <TableCell>{product.pricingUnit}</TableCell>
                                    <TableCell>{product.unitPrice}</TableCell>
                                    <TableCell>{product.count}</TableCell>
                                    <TableCell>{product.note}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* 分頁器 */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={products.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    );
};

export default ProductListPage;
