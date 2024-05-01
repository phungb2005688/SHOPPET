import React, { useEffect } from 'react';
import { Image } from 'react-bootstrap';
import Meta from '../components/Meta';

const Introduces = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
    <Meta title={'Giới thiệu'}></Meta>
    <div>
      <div className='container'>
        {/* <!-- <hr/> --> */}
        <div className='pt-3'>
          <div className='card-header'>
            <h2 className='text-center font-weight-bold'>Về SHOPPET</h2>
          </div>
        </div>
        {/* <img className="img-fluid" src="../images/4.png" alt="" style="width:1200px; height: 400px"> */}
        <Image
          src='https://res.cloudinary.com/dazlm83i8/image/upload/v1713327437/slider/banner_intro_ttnktg.png'
          className='img-fluid'
        ></Image>
        <div style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
          <div className='pt-5 lh-lg' style={{ textAlign: 'justify' }}>
            <p className='text-secondary ms-4'>
              Chào mừng bạn đến với <strong>SHOPPET </strong> - Điểm đến hoàn
              hảo cho sức khỏe và hạnh phúc của thú cưng!
            </p>
            <p className='text-secondary ms-4 '>
              Tại <strong>SHOPPET </strong>, chúng tôi hiểu rằng thú cưng không
              chỉ là bạn đồng hành, mà còn là một phần của gia đình bạn. Vì vậy,
              chúng tôi cam kết mang đến những sản phẩm thức ăn chất lượng cao
              và dịch vụ chăm sóc khách hàng chuyên sâu, nhằm giúp những người
              bạn bốn chân của bạn đạt được sức khỏe tốt nhất và hạnh phúc trọn
              vẹn.
            </p>
            <p className='text-secondary ms-4'>
              Tại <strong>SHOPPET </strong>, sự hiểu biết sâu sắc về nhu cầu
              dinh dưỡng đa dạng của các loài thú cưng khác nhau là ưu tiên hàng
              đầu của chúng tôi. Đội ngũ chuyên gia dinh dưỡng thú cưng của
              chúng tôi luôn sẵn sàng tư vấn và hỗ trợ bạn số điện thoại được đề
              cập trong việc chọn lựa thức ăn phù hợp nhất, đảm bảo thú cưng của
              bạn luôn khỏe mạnh và vui vẻ.
            </p>
            <p className='text-secondary ms-4'>
              Với bộ sưu tập thức ăn thú cưng đa dạng từ các thương hiệu uy tín,
              chúng tôi tự tin mang đến cho bạn và thú cưng của bạn trải nghiệm
              mua sắm độc đáo và đẳng cấp. Đắm chìm trong không gian thân thiện
              và khám phá sự hoàn hảo từ những sản phẩm dành cho thú cưng hàng
              đầu tại <strong>SHOPPET </strong> - nơi nuôi dưỡng sức khỏe và
              niềm vui cho thú cưng của bạn!
            </p>
            <p className='text-secondary ms-4'>
              Hãy ghé thăm chúng tôi tại <strong>SHOPPET </strong> và khám phá
              bí mật để có thú cưng khỏe mạnh và hạnh phúc. Chúng tôi luôn sẵn
              sàng chào đón bạn!
            </p>
          </div>
        </div>
        <div className='row pt-5'>
          <div className='col'>
            <h5>Sứ mệnh</h5>
            <div className='lh-lg ms-4 introduce'>
              <p className='text-secondary'>
                Tại <strong>SHOPPET</strong>, sứ mệnh của chúng tôi không chỉ
                dừng lại ở việc cung cấp thức ăn chất lượng cao cho thú cưng, mà
                còn là nâng cao chất lượng cuộc sống cho các thành viên bốn chân
                trong gia đình bạn.
              </p>
              <p className='text-secondary'>
                <strong>SHOPPET </strong> chúng tôi cam kết mang lại niềm vui và
                sức khỏe cho thú cưng của bạn qua từng sản phẩm được chọn lọc kỹ
                càng, giúp tăng cường sức khỏe và sự năng động cho chúng.
              </p>
            </div>
          </div>
          <div className='col'>
            <h5>Tầm nhìn</h5>
            <div className='lh-lg ms-4 introduce'>
              <p className='text-secondary'>
                Tầm nhìn của <strong>SHOPPET </strong> chúng tôi hướng đến việc
                xây dựng một trang web bán thức ăn thú cưng nơi mọi người đến
                mua sắm. SHOPPET không chỉ là một cửa hàng, mà còn là người bạn
                đồng hành đáng tin cậy trên hành trình làm bạn với thú cưng, hỗ
                trợ bạn trong mọi giai đoạn cuộc đời của chúng.
              </p>
              {/* <p className='text-secondary'>
                Tầm nhìn của chúng tôi không chỉ là về việc cung cấp sản phẩm,
                mà còn là nơi chia sẽ kinh nghiệm với khách hàng về việc nuôi
                thú cưng thông qua mạng xã hội của chúng tôi.
              </p> */}
            </div>
          </div>
          <div className='col'>
            <h5>Định hướng</h5>
            <div className='lh-lg ms-4 introduce'>
              <p className='text-secondary'>
                <strong>SHOPPET</strong> đảm bảo sức khỏe và sự an toàn cho
                chúng. Mục tiêu của chúng tôi là tạo ra một không gian mua sắm
                thuận tiện, độc đáo và đáng tin cậy, phục vụ mọi loại thú cưng
                từ những chú chó, mèo cho đến các loài thú cảnh nhỏ khác.
              </p>
              <p className='text-secondary'>
                Hy vọng <strong>SHOPPET </strong> sẽ ngày càng phát triển và cung cấp những dịch
                vụ tốt nhất cho khách hàng.
              </p>
            </div>
          </div>
          <h5 className='text-center pt-4'>
            Xin chân thành cảm ơn các bạn vì đã đọc đến đây 🥰🥰
          </h5>
        </div>
      </div>
    </div>
    </>
    
  );
};

export default Introduces;
