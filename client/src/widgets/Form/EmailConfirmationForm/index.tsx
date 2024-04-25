'use client'

import { Button } from "@shared/ui/Buttons_Components/Buttons";
import Input from "@shared/ui/Inputs/DefaultInport";
import Heading from "@shared/ui/Heading/index";
import MiniText from "@shared/ui/MiniText";
import { useEmailConfirm } from "@shared/lib/hooks/Form/useEmailConfirm";
import { useState } from "react";

import styles from "../styles/styles.module.scss";
import "../../../shared/styles/mixins.scss";

import SparkLogo from "@assets/spark_product_logo.svg";

const EmailConfirm = () => {
const [input1, setInput1] = useState('');
const [input2, setInput2] = useState('');
const [input3, setInput3] = useState('');
const [input4, setInput4] = useState('');
const [input5, setInput5] = useState('');

const handleSubmit = async (event) => {
  event.preventDefault();

  const result = await useEmailConfirm({ input1, input2, input3, input4, input5 });
  if (typeof result === 'string') {
    alert(result);
  }
 }
  
return (
  <section className={styles.registration}>
    <div className={styles.registration__content}>
      <div className={styles.registration__logo}>
        <SparkLogo />
      </div>
      <Heading text="Подтверждение почты" margin="mt-8" />
      <div className="text-user">
        <span className="text_with_detail">
          Аккаунт:
          <span className="text_orange"> smth</span>
        </span>
      </div>
      <div className="text-mail">
        <span className="text_with_detail">
          Письмо с подтверждением отправлено на почту
          <div>
            <span className="text_orange">ruslanmakmhatom@gmail.com</span>
          </div>
        </span>
      </div>
      <form className={styles.registration__form} onSubmit={handleSubmit}>
        <div className={styles.confirmation_input}>
          <Input inputType="email" maxLength={1} autoComplete="off" value={input1} onChange={e => setInput1(e.target.value)} type="text"/>
          <Input inputType="email" maxLength={1} autoComplete="off" value={input2} onChange={e => setInput2(e.target.value)} type="text"/>
          <Input inputType="email" maxLength={1} autoComplete="off" value={input3} onChange={e => setInput3(e.target.value)} type="text"/>
          <Input inputType="email" maxLength={1} autoComplete="off" value={input4} onChange={e => setInput4(e.target.value)} type="text"/>
          <Input inputType="email" maxLength={1} autoComplete="off" value={input5} onChange={e => setInput5(e.target.value)} type="text"/>
        </div>
        <Button text="Подтвердить" buttonType="regular" margin="mt-16" />
        <MiniText
          linktext="Отправить еще раз"
          text="Не пришел код?"
          href="email-confirmation"
          margin="mt-4"
        />
      </form>
    </div>
  </section>
);
};

export default EmailConfirm;