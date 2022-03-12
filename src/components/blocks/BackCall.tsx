import { ReactElement } from "react";
import styles from "./BackCall.module.scss";
import { Container, Form, FormGroup, } from "react-bootstrap";
import cls from "classnames";

export const BackCall = (): ReactElement => {
  return (
    <section className={cls(styles.backcall, styles.pt_100)}>
        <div className={cls(styles.backcall_inner, styles.text_center, styles.ptb_100)}> 
            <Container>
                    <h2 className={styles.backcall_title}>Request for a call back</h2>
                    <p className={styles.backcall_text}>Wants to get latest updates! sign up for Free</p>
                <Form>
						  <div className={styles.form_group}>
						    <input className={styles.form_control} type="tel" placeholder="Your phone number" required/>
                          </div>
						  <button type="submit" className={cls(styles.form_btn, styles.text_uppercase)}>
							<span className={styles.sub_r}>Send</span> 
							<i className={cls(styles.fa, styles.fa_send, styles.icon_r)}></i>
						  </button>
			    </Form>
            </Container>
        </div>
    </section>
  );
};
