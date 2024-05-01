import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'ADMIN_ShopPet',
  description: 'Chúng tôi bán những sản phẩm chất lượng dành cho thú cưng',
  keywords: 'Thú cưng, mua thức ăn',
};

export default Meta;
