import React from 'react';
import './Form.css'
import Bondiano from '../Form/assets/bond_approve.jpg'

const fields = [
  {
    id: 0,
    name: 'firstname',
    value: 'Имя',
    type: 'text',
    errors: {
      empty: 'Нужно указать имя',
      incorrect: 'Имя указано не верно',
    },
  },
  {
    id: 1,
    name: 'lastname',
    value: 'Фамилия',
    type: 'text',
    errors: {
      empty: 'Нужно указать фамилию',
      incorrect: 'Фамилия указана не верно',
    },
  },
  {
    id: 2,
    name: 'password',
    value: 'Пароль',
    type: 'password',
    errors: {
      empty: 'Нужно указать пароль',
      incorrect: 'Пароль указан не верно',
    },
  },
]

const userData = {
  firstname: 'James',
  lastname: 'Bond',
  password: '007',
}

const Success = () => {
  return (
    <img
      src={Bondiano}
      alt="bond approve"
      className={'t-bond-image'}
    />
  )
}

class Form extends React.Component {

  state = {
    values: {
      firstname: '',
      lastname: '',
      password: '',
    },
    errors: {
      firstname: '',
      lastname: '',
      password: '',
    },
    isSubmited: false,
  }

  handleSubmit = (evt) => {
    evt.preventDefault();

    if (this.handleValidation()) {
      this.setState({isSubmited: true})
    }
  }

  handleChange = (evt) => {
    this.setState({
        errors: {firstname: '', lastname: '', password: '',},
        values: {...this.state.values, [evt.target.name]: evt.target.value}
      }
    )
  }

  handleValidation = () => {
    let isValid = true;
    let errors = {
      firstname: '',
      lastname: '',
      password: '',
    };

    // FirstName
    if (!this.state.values.firstname) {
      isValid = false;
      errors.firstname = fields[0].errors.empty;
    } else if (this.state.values.firstname !== userData.firstname) {
      isValid = false;
      errors.firstname = fields[0].errors.incorrect;
    }

    // LastName
    if (!this.state.values.lastname) {
      isValid = false;
      errors.lastname = fields[1].errors.empty;
    } else if (this.state.values.lastname !== userData.lastname) {
      isValid = false;
      errors.lastname = fields[1].errors.incorrect;
    }

    // Password
    if (!this.state.values.password) {
      isValid = false;
      errors.password = fields[2].errors.empty;
    } else if (this.state.values.password !== userData.password) {
      isValid = false;
      errors.password = fields[2].errors.incorrect;
    }

    this.setState({errors: errors})
    return isValid;
  }

  render() {
    return (
      <div className={'app-container'}>
        {this.state.isSubmited
          ?
          <Success/>
          :
          <form onSubmit={this.handleSubmit} className={'form'}>
            <h1>Введите свои данные, агент</h1>

            {fields.map(field =>
              <p className={'field'} key={field.id}>
                <label htmlFor={field.name} className={'field__label'}>
                  <span className={'field-label'}>{field.value}</span>
                </label>
                <input
                  onChange={this.handleChange}
                  name={field.name}
                  className={`field__input field-input t-input-${field.name}`}
                  type={field.type}
                  value={this.state.values[field.name]}
                />
                <span className={`field__error field-error t-error-${field.name}`}>
                {this.state.errors[field.name]}
              </span>
              </p>
            )}

            <div className={'form__buttons'}>
              <input type="submit" className={'button t-submit'} value={'Проверить'}/>
            </div>

          </form>
        }
      </div>
    )
  }
}

export default Form;
