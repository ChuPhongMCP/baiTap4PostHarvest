import React, { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Card } from 'antd';

import { axiosAdmin, formatter } from "helper";
import Loading from "components/loading";

function ProductDetailPage() {
  const params = useParams(); //khai báo params sử dụng useParams() để lấy id từ url hiện tại

  const [product, setProduct] = useState({}); //khai báo product là một object rỗng
  const [isLoading, setIsLoading] = useState(true); //khai báo biến state isLoading để gọi màn hình loading

  useEffect(() => {
    const getProductData = async () => { //hàm lấy productData từ api
      try {
        const url = `/products/${params.id}`; //đường dẫn api, phần tiền tố nằm trong file .env, ${params.id} lấy từ id của đường dẫn hiện tại
        const res = await axiosAdmin.get(url); //get data từ api
        setProduct(res.data.payload); //gán product bằng data trả về từ api
        setIsLoading(false); //set biến isLoading bằng false để tắt màn hình loading
      } catch (err) {
        console.error("««««« err »»»»»", err); //ném lỗi nếu call api thất bại
      }
    };

    getProductData(); //gọi hàm getProductData()
  }, [params.id]);

  return (
    <div className="d-flex justify-content-center mt-5">
      {
      isLoading ? ( //nếu chưa có phản hồi từ api
        <Loading /> //gọi màn hình loading
      ) : ( //nếu đã có return product card theo các field tương ứng trong data từ api
        product && (
          <Card
            style={{ width: 300 }}
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <p style={{fontSize: "25px"}} className="fw-bold">{product.name}</p>
            <p className="fst-italic">Mô tả: {product.description}</p>
            <p className="fst-italic">Discount: {product.discount}%</p>
            <p className="fst-italic">Giá giảm: {formatter.format(product.discountedPrice)}</p>
            <p className="fst-italic">Giá gốc: {formatter.format(product.price)}</p>
            <p className="fst-italic">Tồn kho: {product.stock}</p>
            <p className="fst-italic">Danh mục: {product.category.name}</p>
            <p className="fst-italic">Nhà cung cấp: {product.supplier.name}</p>
          </Card>
        )
      )}
    </div>
  );
}

export default memo(ProductDetailPage);
