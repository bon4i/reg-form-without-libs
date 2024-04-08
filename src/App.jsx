import { useState } from 'react';
import styles from './App.module.css';
import React from 'react';
import { EMAIL_REGEXP } from './utils';
import { PASS_REGEXP } from './utils';
import { emailErrors } from './utils';
import { passwordErrors } from './utils';
import { sendFormData } from './utils';
import { InputField } from './components/InputField/InputField';

export const App = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmedPassword: '',
	});

	const [errorData, setErrorData] = useState({
		emailError: '',
		passwordError: '',
		confirmedPasswordError: '',
	});

	const onEmailChange = ({target}) => {
		setFormData(prevData => ({
			...prevData,
			email: target.value,
		}));
		if (!EMAIL_REGEXP.test(target.value)) {
			setErrorData({...errorData, emailError: emailErrors.formatError});
		} else if (target.value.length > 30) {
			setErrorData({...errorData, emailError: emailErrors.maxLengthError});
		} else if (target.value.length < 3) {
			setErrorData({...errorData, emailError: emailErrors.minLengthError});
		} else {
			clearError();
		}
		console.log(errorData)
	}

	const onPasswordChange = ({target}) => {
		setFormData({
			...formData,
			password: target.value,
		});
		if (!PASS_REGEXP.test(target.value)) {
			setErrorData({...errorData, passwordError: passwordErrors.formatError});
		} else if (target.value.length < 6) {
			setErrorData({...errorData, passwordError: passwordErrors.minLengthError});
		} else {
			clearError()
		}
		console.log(errorData)
	}

	const onConfirmedPasswordChange = ({target}) => {
		setFormData({
			...formData,
			confirmedPassword: target.value,
		});
		if (formData.password !== target.value) {
			setErrorData({...errorData, confirmedPasswordError: passwordErrors.checkPasswordError});
		} else {
			clearError()
		}
		console.log(errorData)
	}

	const onSubmitRegistration = (event) => {
		event.preventDefault();
		sendFormData(formData);
	}

	const clearError = () => {
		setErrorData({
			emailError: '',
			passwordError: '',
			confirmedPasswordError: '',})
	}

	const emailErrorHTML = errorData.emailError && <div className={styles.error}>{errorData.emailError}</div>
	const passwordErrorHTML = errorData.passwordError && <div className={styles.error}>{errorData.passwordError}</div>
    const confirmedPasswordErrorHTML = errorData.confirmedPasswordError && <div className={styles.error}>{errorData.confirmedPasswordError}</div>

	return (
		<div className={styles.app}>
			<div className={styles.header}>
				<p className={styles.title}>Регистрация</p>
			</div>
			<form className={styles.form} onSubmit={onSubmitRegistration}>
					<InputField
						label={'Почта'}
						type={'email'}
						id={'email'}
						value={formData.email}
						name={'email'}
						placeholder='Введите адрес ящика в формате @example.ru'
						onChange={onEmailChange}
					/>
					<InputField
						label={'Пароль'}
						type={'password'}
						id={'password'}
						value={formData.password}
						name={'password'}
						placeholder='Введите пароль'
						onChange={onPasswordChange}
					/>
					<InputField
						label={'Повторите пароль'}
						type={'password'}
						id={'confirmedPassword'}
						value={formData.confirmedPassword}
						name={'confirmedPassword'}
						placeholder='Повторите пароль'
						onChange={onConfirmedPasswordChange}
					/>
					{emailErrorHTML || passwordErrorHTML || confirmedPasswordErrorHTML}
					<button type='submit' disabled={!emailErrorHTML || !passwordErrorHTML || !confirmedPasswordErrorHTML}>
						Зарегистроваться
					</button>
			</form>
		</div>
	);
};
