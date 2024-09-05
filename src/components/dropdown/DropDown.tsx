import { useRef } from "react";
import { Link } from "react-router-dom";
import styles from "styles/components/DropDown.module.scss";
import useDetectClose from "../../hooks/useDetectClose";

const DropDown = () => {
  const dropDownRef = useRef<HTMLUListElement | null>(null);
  const { isOpen, setIsOpen } = useDetectClose({ elem: dropDownRef, initialState: false });

  return (
    <div className={styles.dropDownMenu}>
      <button onClick={() => setIsOpen(prev => !prev)}>
        메뉴 보기
      </button>

      <ul ref={dropDownRef}>
        <li>
          <Link to="/mypage">마이페이지</Link>
        </li>
        {/* 메뉴 리스트들 */}
      </ul>
    </div>
  );
};

export default DropDown;
