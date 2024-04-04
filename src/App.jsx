import { useState } from 'react';
import styles from './App.module.css';
import React from 'react';

export const App = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmedPassword: '',
	});
	const [error, setError] = useState(null);
	const { email, password, confirmedPassword } = formData;
	const EMAIL_REGEXP = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
	const PASS_REGEXP = /(?=.*[0-9])(?=.*[a-z])/g;
	let newError = null;

	const onEmailChange = ({target}) => {
		setFormData({
			...formData,
			email: target.value,
		});
		if (!EMAIL_REGEXP.test(target.value)) {
			newError = 'Неверная почта. Данные должны быть в формате @email.ru!'
		} else if (target.value.length > 30) {
			newError = 'Неверная почта. Должно быть не больше 30 символов!';
		} else if (target.value.length < 3) {
			newError = 'Неверная почта. Должно быть не меньше 3 символов!';
		}
		setError(newError);
	}

	const onPasswordChange = ({target}) => {
		setFormData({
			...formData,
			password: target.value,
		});
		if (!PASS_REGEXP.test(target.value)) {
			newError = 'Пароль должен содержать: хотя-бы одно число и хотя-бы одну латинскую букву в нижнем регистре!'
		} else if (target.value.length < 6) {
			newError = 'Слишком легкий пароль. Пароль должен быть не короче 6 символов!';
		}
		setError(newError);
	}

	const onConfirmedPasswordChange = ({target}) => {
		setFormData({
			...formData,
			confirmedPassword: target.value,
		});
		if (formData.password === formData.confirmedPassword) {
			newError = 'Введенные пароли не совпадают!';
		}
		setError(newError);
	}

	const sendFormData = (formData) => {
		console.log(formData);
	}

	const onSubmitRegistration = (event) => {
		event.preventDefault();
		sendFormData(formData);
	}

    return (
		<div className={styles.app}>
			<div className={styles.header}>
				<p className={styles.title}>Регистрация</p>
			</div>
			<form className={styles.form} onSubmit={onSubmitRegistration}>
				<div className={styles['register-form']}>
					<label htmlFor='email'>Почта</label>
					<input
						type='text'
						id='email'
						value={email}
						placeholder='Введите адрес ящика в формате @example.ru'
						onChange={onEmailChange}
					/>
					<label htmlFor='pwd'>Пароль</label>
					<input
						type='password'
						id='pwd'
						value={password}
						placeholder='Придумайте пароль'
						onChange={onPasswordChange}
					/>
					<label htmlFor='pwd-repeat'>Повторите пароль</label>
					<input
						type='password'
						id='pwd-repeat'
						value={confirmedPassword}
						placeholder='Повторите пароль'
						onChange={onConfirmedPasswordChange}
					/>
					{error && <div className={styles.error}>{error}</div>}
					<button
						type='submit'
						disabled={!!error}
					>
						Зарегистроваться
					</button>
				</div>
			</form>
		</div>
	);
};
