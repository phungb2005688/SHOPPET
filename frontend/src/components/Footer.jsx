import { Container } from 'react-bootstrap';
import { FaMapPin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { TbDeviceLandlinePhone } from "react-icons/tb";
import { Link } from 'react-router-dom';
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='text-center text-lg-start bg-white text-black'>
      <div style={{marginTop: '100px'}}>

      </div>
      <Container>
        <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
          <div className='me-5 d-none d-lg-block'>
            <span>Kết nối với chúng tôi trên các mạng xã hội:</span>
          </div>

          <div>
            <Link to='#' className='text-decoration-none me-4 link-secondary'>
              <i style={{ color: '#000' }} className='bi bi-facebook'></i>
            </Link>
            <Link to='#' className='text-decoration-none me-4 link-secondary'>
              <i style={{ color: '#000' }} className='bi bi-twitter'></i>
            </Link>
            <Link to='#' className='text-decoration-none me-4 link-secondary'>
              <i style={{ color: '#000' }} className='bi bi-instagram'></i>
            </Link>
            <Link to='#' className='text-decoration-none me-4 link-secondary'>
              <i style={{ color: '#000' }} className='bi bi-linkedin'></i>
            </Link>
          </div>
        </section>

        <section className=''>
          <div className='container text-center text-md-start mt-5'>
            <div className='row mt-3'>
              <div className='col-md-3 col-lg-4 col-xl-3 mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-2'>
                  <i className='fa fa-diamond'></i>Shop Pet
                </h6>
                <p>
                  <b>Shop Pet</b> là nơi kinh doanh các sản phẩm phẩm chất lượng
                  về nguồn gốc và sẵn sàng giải đáp thắc mắc của bạn thông qua
                  phần <b>Liên hệ</b>.
                </p>
                <p>
                  Nơi mang đến cho bạn những trải nghiệm tuyệt vời khi bắt đầu
                  với thú cưng của bạn.
                </p>
              </div>

              <div className='col-md-2 col-lg-2 col-xl-2 mx-auto mb-2'>
                <h6 className='text-uppercase fw-bold mb-4'>Về chúng tôi</h6>
                <p>
                  <Link to='/introduces'
                    className='text-decoration-none text-reset'
                  >
                    Giới thiệu
                  </Link>
                </p>
                <p>
                  <Link
                    to='/'
                    className='text-decoration-none text-reset'
                  >
                    Trang chủ
                  </Link>
                </p>
              </div>

              <div className='col-md-4 col-lg-4 col-xl-3 mx-auto mb-2'>
                <h6 className='text-uppercase fw-bold mb-4'>Chính sách</h6>
                <p>
                  <Link to='#!' className='text-decoration-none text-reset'>
                    Chính sách bảo mật
                  </Link>
                </p>
                <p>
                  <Link to='#!' className='text-decoration-none text-reset'>
                    Điều khoản dịch vụ
                  </Link>
                </p>
                <p>
                  <Link to='#!' className='text-decoration-none text-reset'>
                    Vận chuyển & giao nhận
                  </Link>
                </p>
              </div>

              <div className='col-md-3 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-2'>
                <h6 className='text-uppercase fw-bold mb-4'>Liên hệ</h6>
                <p>
                  <FaMapPin className='icon-custom ' />
                  VietNam, Can Tho B3412
                </p>
                <p>
                  <MdEmail className='icon-custom'></MdEmail>
                  shoppet@gmail.com
                </p>
                <p>
                  <TbDeviceLandlinePhone className='icon-custom'/> 0292090909 - 0327096727
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className='text-center p-2' style={{ backgroundColor: '#333', color: 'white' }}>
          © {currentYear} Copyright:
          <Link className='text-decoration-none text-reset fw-bold' href='#'>
            shoppet.com
          </Link>
        </div>
      </Container>
    </footer>

    /* { <Container>
        <Row>
          <Col classNameName='text-center py-3'>
            <p>ShopPet &copy; {currentYear}</p>
          </Col>
        </Row>
      </Container> }*/
  );
};
export default Footer;
