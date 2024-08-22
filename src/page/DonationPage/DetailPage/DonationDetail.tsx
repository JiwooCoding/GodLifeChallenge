import GetPoint from '../getPoint/GetPoint'
import styles from './DonationDetail.module.scss'
import donation_header from '../../../image/donation/donation_header.png'
import children1 from '../../../image/donation/children1.png'
import children2 from '../../../image/donation/children2.png'
import children3 from '../../../image/donation/children3.png'
import image1 from '../../../image/donation/image1.png'
import image2 from '../../../image/donation/image2.png'
import image3 from '../../../image/donation/image3.png'
import result1 from '../../../image/donation/result_image1.png'
import result2 from '../../../image/donation/result_image2.png'
import result3 from '../../../image/donation/result_image3.png'
import donation from '../../../image/donation/donation1.png'
import { useEffect, useState } from 'react'
import Modal from './modal/Modal'
import { useUser } from '../../../contexts/UserProvider'


const DonationDetail = () => {

  const [showNav, setShowNav] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const {user} = useUser();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 230) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isModalOpen = () => {
    setModalOpen(true);
  }

  const isModalClose = () => {
    setModalOpen(false);
  }


  return (
    <>
      {showNav && (
          <nav className={styles.navbar}>
            <span>후원과 참여</span>
            <button onClick={isModalOpen}>기부하기</button>
          </nav>
      )}
      <div className={styles.donation_header}>
        <img src={donation_header} className={styles.donation_headerImg} alt='donation_header_image' style={{width:'100%', height:'230px'}}/>
        <div className={styles.donation_title}>
          <span className={styles.donation_headerTitle}>후원과 참여</span>
        </div>
        <section className={styles.donation_page}>
          <h1>매달 어린이들을 위한 약속</h1>
          <span>
          매달 일정 금액을 꾸준히 후원해 주시면<br/>
          어린이에게 더 큰 도움을 줄 수 있습니다.<br/>
          정기후원은 안정적인 후원금 확보로 어린이의 행복한 삶을<br/>
          위한 장기적인 지원을 가능하게 해 줍니다.<br/>
          </span>

          <div className={styles.contentbox}>
            <div className={styles.image_content}>
              <img src={children1} alt='image1'/>
              <div className={styles.content}>
                <span>세계 어린이 돕기</span>
                <p>전 세계 도움이 필요한 어린이들이 건강하게 자라고 안전하게 살 수 있도록 지원합니다.</p>
              </div>
            </div>
            <div className={styles.image_content}>
              <img src={children2} alt='image2'/>
              <div className={styles.content}>
                <span>난민 어린이 돕기</span>
                <p>자연재해, 전쟁으로 집을 잃고 고생하는 난민 어린이를 지원합니다.</p>
              </div>
            </div>
            <div className={styles.image_content}>
              <img src={children3} alt='image3'/>
              <div className={styles.content}>
                <span>에이즈 감염 어린이 돕기</span>
                <p>에이즈로 부모를 잃은 어린이를 보호하고 모자감염 예방과 치료를 지원합니다.</p>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.donation_container}>
          <div className={styles.donation_page1}>
            <h1>전 세계 어린이들의 변화,<br/>
            후원자님이 있어 가능합니다</h1>
            <div className={styles.card_list}>
              <div className={styles.card}>
                <div className={styles.top_card}>
                  <div className={styles.card_image}>
                    <img src={image1} alt='image1'/>
                  </div>
                  <div className={styles.card_text}>
                    매년 어린이 약 <b>500만 명</b>이 다섯 번째 생일을 맞기 전 목숨을 잃습니다. 
                  </div>
                </div>
                <div className={styles.card_result}>
                  <div className={styles.result_image}>
                    <img src={result1} alt='result_image1'/>
                  </div>
                  <div className={styles.result_text}>
                    <h2>5세 미만 어린이 사망률</h2>
                    <h1>50% 감소</h1>
                  </div>
                </div>
              </div>
              <div className={styles.card}>
                <div className={styles.top_card}>
                  <div className={styles.card_image}>
                    <img src={image2} alt='image2'/>
                  </div>
                  <div className={styles.card_text}>
                  현재 전 세계 어린이 <b>10명 중 1명</b>은 초등 교육을 받지 못하고, <b>3명 중 1명</b>은 10세가 될 때까지 글을 읽거나 이해하지 못하는 어린이는 전 세계 어린이의 <b>64.3%</b>로 추정됩니다.
                  </div>
                </div>
                <div className={styles.card_result}>
                  <div className={styles.result_image}>
                    <img src={result2} alt='result_image2'/>
                  </div>
                  <div className={styles.result_text}>
                    <h2>초등교육을 받지 못한 어린이</h2>
                    <h1>35% 감소</h1>
                  </div>
                </div>
              </div>
              <div className={styles.card}>
                <div className={styles.top_card}>
                  <div className={styles.card_image}>
                    <img src={image3} alt='image3'/>
                  </div>
                  <div className={styles.card_text}>
                  5세 미만 어린이 <b>3명 중 1명</b>은 영양실조이고, 어린이와 청소년 <b>약 260만 명</b>이 HIV에 감염되어 살아가며, 2022년 어린이 <b>10만 명</b>이 에이즈 관련 질병으로 사망했습니다.
                  </div>
                </div>
                <div className={styles.card_result}>
                  <div className={styles.result_image}>
                    <img src={result3} alt='result_image3'/>
                  </div>
                  <div className={styles.result_text}>
                    <h2>HIV 신규 감염 어린이(0-9세)</h2>
                    <h1>75% 감소</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.donation_page3}>
          <div className={styles.donation_detailpage}>
            <h1>
              하지만 여전히 도움이 필요한<br/>
              어린이가 많습니다
            </h1>
          </div>
          <div className={styles.donation_image}>
            <img src={donation} alt='donation_image'/>
          </div>
          <div className={styles.donation_contents}>
            <div className={styles.donation_content}>
              <span>심각한 빈곤을 겪는 전세계 어린이</span>
              <h2>3명 중 1명</h2>
            </div>
            <div className={styles.donation_content}>
              <span>필수 예방접종을 받지 못하는 어린이</span>
              <h2>2,050만명</h2>
            </div>
            <div className={styles.donation_content}>
              <span>깨끗하고 안전한 식수를 사용하지 못하는 어린이와 가족</span>
              <h2>5명 중 1명</h2>
            </div>
          </div>
        </section>
      </div>
      {/* 유저가 있을 경우에만 포인트 얻을 수 있게 해둠 */}
      {user && (
        <GetPoint/>
      )}
      <Modal isOpen={modalOpen} onClose={isModalClose}/>
    </>
  )
}

export default DonationDetail
