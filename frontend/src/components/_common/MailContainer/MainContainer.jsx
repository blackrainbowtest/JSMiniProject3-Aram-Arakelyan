import s from './MainContainer.module.css'
import cs from '../../../common/style.module.css'

// Main client container
export const MainContainer = ({ children }) => {
    return (
        <div className={cs.wrap}>
            <div className={`${cs.main} ${s.swiperContainer}`}>
                <div className={s.dtBsh}></div>
                {children}
            </div>
        </div>
    )
};
