import {useState} from 'react'

import {PaymentElement, useCheckout} from '@stripe/react-stripe-js'
import {Button, Input, Label} from '@components'

const validateEmail = async (email, checkout) => {
  const updateResult = await checkout.updateEmail(email)
  const isValid = updateResult.type !== 'error'

  return {isValid, message: !isValid ? updateResult.error.message : null}
}

const EmailInput = ({email, setEmail, error, setError}) => {
  const checkout = useCheckout()

  const handleBlur = async () => {
    if (!email) {
      return
    }

    const {isValid, message} = await validateEmail(email, checkout)
    if (!isValid) {
      setError(message)
    }
  }

  const handleChange = (e) => {
    setError(null)
    setEmail(e.target.value)
  }

  return (
    <>
      <Label className='mb-2'>
        Email
        <Input
          id='email'
          type='text'
          value={email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={error ? 'error' : ''}
        />
      </Label>
      {error && <div id='email-errors'>{error}</div>}
    </>
  )
}

const CheckoutForm = () => {
  const checkout = useCheckout()

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(null)
  const [message, setMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsLoading(true)

    const {isValid, message} = await validateEmail(email, checkout)
    if (!isValid) {
      setEmailError(message)
      setMessage(message)
      setIsLoading(false)
      return
    }

    const confirmResult = await checkout.confirm()

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (confirmResult.type === 'error') {
      setMessage(confirmResult.error.message)
    }

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <EmailInput
        email={email}
        setEmail={setEmail}
        error={emailError}
        setError={setEmailError}
      />
      <Label>Payment</Label>
      <PaymentElement id='payment-element' />
      <Button disabled={isLoading} id='submit' className='mt-2'>
        {isLoading ? (
          <div className='spinner'></div>
        ) : (
          `Pay ${checkout.total.total.amount} now`
        )}
      </Button>
      {/* Show any error or success messages */}
      {message && <div id='payment-message'>{message}</div>}
    </form>
  )
}

export default CheckoutForm
