import styles from './App.module.css';
import React from 'react';

export const App = () => {
    return (
		<div className={styles.app}>
			<div className={styles.header}>
				<p className={styles.title}>Регистрация</p>
			</div>
			<div className={styles.form}>
				<div className={styles['register-form']}>
					<label for='email'>Почта</label>
					<input type='email' id='email' placeholder='Укажите адресс почтового ящика'/>
					<label for='pwd'>Пароль</label>
					<input type='password' id='pwd' placeholder='Придумайте пароль' />
					<label for='pwd-repeat'>Повторите пароль</label>
					<input type='password' id='pwd-repeat' placeholder='Повторите пароль' />
					<button type='submit'>Зарегистроваться</button>
				</div>
			</div>
		</div>
	);
};
