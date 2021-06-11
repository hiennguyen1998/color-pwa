import Modal from "../Modal/Modal";
import classes from "./Notify.module.css";
import close from "../../assets/img/close.png";

const Notify = (props) => {
  return (
    <Modal onClose={props.onClose}>
      <div className={classes.actions}>
        <div>
          <img
            className={classes["btn-close"]}
            src={close}
            alt="cart"
            onClick={props.onClose}
          />
        </div>
        <div className={classes.total}>
          <h5>Fonctionnalité actuellement non disponible.</h5>
        </div>
      </div>
    </Modal>
  );
};

export default Notify;
