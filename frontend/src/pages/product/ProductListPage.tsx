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

interface Product {
    id: number;
    supplierId: number;
    name: string;
    pricingUnit: string;
    unitPrice: number;
    count: number;
    note: string;
}

interface Supplier {
    id: number;
    name: string;
}

const ProductListPage: React.FC = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [suppliersMap, setSuppliersMap] = useState<Map<string, string>>(new Map());
    const [productOptions, setProductOptions] = useState<{ label: string; id: string }[]>([]);
    const [supplierOptions, setSupplierOptions] = useState<{ label: string; id: string }[]>([]);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
    const [selectedSupplierId, setSelectedSupplierId] = useState<string | null>(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [fetchedProducts, fetchedSuppliers] = await Promise.all([
                    getProducts(),
                    getSuppliers(),
                ]);

                // 供應商 Map
                const supplierMap: Map<string, string> = new Map(
                    fetchedSuppliers.map((supplier: Supplier) => [supplier.id.toString(), supplier.name])
                );
                setSuppliersMap(supplierMap);

                // 產品選項
                setProductOptions(
                    fetchedProducts.map((product: Product) => ({
                        label: product.name,
                        id: product.id.toString(),
                    }))
                );

                // 供應商選項
                setSupplierOptions(
                    fetchedSuppliers.map((supplier: Supplier) => ({
                        label: supplier.name,
                        id: supplier.id.toString(),
                    }))
                );

                setProducts(fetchedProducts as Product[]);
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

    const filteredProducts = products.filter((product) => {
        const productMatch =
            !selectedProductId || product.id.toString() === selectedProductId;
        const supplierMatch =
            !selectedSupplierId || product.supplierId.toString() === selectedSupplierId;
        return productMatch && supplierMatch;
    });

    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom>
                產品列表
            </Typography>

            {/* 搜尋欄位與新增按鈕 */}
            <Box
                display="flex"
                flexDirection={{ xs: 'column', sm: 'row' }} // 小螢幕堆疊，大螢幕橫向排列
                justifyContent="space-between"
                alignItems="center"
                gap={2}
                mb={2}
            >
                {/* 搜尋欄位容器 */}
                <Box
                    display="flex"
                    flexDirection={{ xs: 'column', sm: 'row' }}
                    flex={1}
                    gap={2}
                    width="100%" // 保證容器佔滿寬度
                >
                    <Autocomplete
                        options={[{ label: '全部產品', id: '' }, ...productOptions]}
                        getOptionLabel={(option) => option.label}
                        onChange={(event, value) => setSelectedProductId(value?.id ?? null)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="產品名稱"
                                variant="outlined"
                                fullWidth
                            />
                        )}
                        sx={{ flex: 1, minWidth: { xs: '100%', sm: '250px' } }}
                    />
                    <Autocomplete
                        options={[{ label: '全部供應商', id: '' }, ...supplierOptions]}
                        getOptionLabel={(option) => option.label}
                        onChange={(event, value) => setSelectedSupplierId(value?.id ?? null)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="供應商名稱"
                                variant="outlined"
                                fullWidth
                            />
                        )}
                        sx={{ flex: 1, minWidth: { xs: '100%', sm: '250px' } }}
                    />
                </Box>

                {/* 新增產品按鈕 */}
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/supplier/products/add')}
                    sx={{
                        width: { xs: '100%', sm: 'auto' }, // 小螢幕全寬，大螢幕自適應
                        whiteSpace: 'nowrap',
                    }}
                >
                    新增產品
                </Button>
            </Box>

            {/* 表格容器 */}
            <TableContainer component={Paper} sx={{ width: '100%', overflowX: 'auto' }}>
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
                        {filteredProducts
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>{product.id}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>
                                        {suppliersMap.get(product.supplierId.toString()) ?? '未知供應商'}
                                    </TableCell>
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
                count={filteredProducts.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    );
};

export default ProductListPage;
