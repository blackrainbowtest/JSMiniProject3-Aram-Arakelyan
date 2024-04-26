import s from "./TouchFormComponent.module.css";

export const TouchFormComponent = () => {
  return (
    <div className={s.mainForm}>
      <div className={s.row}>
        <div className={s.colMd12}>
          <input
            className={s.contactus}
            placeholder='Name'
            type='type'
            name=' Name'
          />
        </div>
        <div className={s.colMd12}>
          <input
            className={s.contactus}
            placeholder='Phone Number'
            type='type'
            name='Phone Number'
          />
        </div>
        <div className={s.colMd12}>
          <input
            className={s.contactus}
            placeholder='Email'
            type='type'
            name='Email'
          />{" "}
        </div>
        <div className={s.colMd12}>
          <textarea
            className={s.textarea}
            placeholder='Message'
            type='type'
            message='Name'
          ></textarea>
        </div>
        <div className={s.colMd12}>
          <button className={s.sendBtn}>Send Now</button>
        </div>
      </div>
    </div>
  );
};
