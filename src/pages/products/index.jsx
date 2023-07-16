import { useEffect, useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'antd';

import { LOCATIONS } from 'constants/index';
import { axiosAdmin, formatter } from "helper";

/* khai báo các field theo table của antd design */
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => <Link to={`${LOCATIONS.PRODUCTS}/${record._id}`}>{text}</Link>, //thành phần trong ô này là 1 đường link dẫn đến chi tiết sản phẩm với id là _id tương ứng nằm trong mảng products đã call api về
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    width: '5%',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: (text, r) => <span>{formatter.format(text)}</span>, //format giá theo chuẩn USD
  },
  {
    title: 'Discount',
    dataIndex: 'discount',
    key: 'discount',
    render: (text) => <span>{text || 0} %</span>, // nếu không có discount thì return 0
  },
  {
    title: 'Giá bán',
    dataIndex: 'discountedPrice',
    key: 'discountedPrice',
    render: (text, r) => <span>{formatter.format(text)}</span>, //format giá theo chuẩn USD
  },
  {
    title: 'Tồn kho',
    dataIndex: 'stock',
    key: 'stock',
  },
  {
    title: 'Danh mục',
    dataIndex: 'stock',
    key: 'stock',
    render: (text, r) => <span>{r.category.name}</span>, //hiển thị danh mục sản phẩm
  },
  {
    title: 'Nhà cung cấp',
    dataIndex: 'supplier',
    key: 'supplier',
    render: (text, r) => <span>{r.supplier.name}</span>, // hiển thị nhà cung cấp
  },
];

function ProductsPage() {
  const [products, setProducts] = useState([]); //khai báo mảng products rỗng
  
  useEffect(() => {
    const getProductsData = async () => { //hàm bất đồng bộ lấy productsData từ api
      try {
        const url = '/products'; //đường dẫn api, phần tiền tố nằm trong file .env
  
        const res = await axiosAdmin.get(url); //lấy data theo đường dẫn api
  
        setProducts(res.data.payload); //gán data trả về vào mảng profucts 
        
      } catch (err) {
        console.error('««««« err »»»»»', err); //ném lỗi nếu call api không thành công
      }
    };

    getProductsData(); //gọi hàm call api lấy productsData
  }, []);

  return (
    <Table rowKey="_id" columns={columns} dataSource={products} /> //return table đã config ở trên
  )
};

export default memo(ProductsPage);
