import '@testing-library/jest-dom/extend-expect'
import {screen, render} from '@testing-library/react'

import userEvent from '@testing-library/user-event'

import {ModalActionButtons} from '../modal-action-buttons'

describe('Common -> modal -> ModalActionButtons', () => {
  const onSubmit = jest.fn()
  const onCancel = jest.fn()

  it('renders ModalActionButtons', () => {
    render(
      <ModalActionButtons
        submitText="Submit"
        handleCancel={onCancel}
        handleSubmit={onSubmit}
      />,
    )

    const cancelBtn = screen.getByRole('button', {name: /cancel/i})
    const submitBtn = screen.getByRole('button', {name: /submit/i})

    expect(cancelBtn).toBeInTheDocument()
    expect(submitBtn).toBeInTheDocument()
  })

  it('renders ModalActionButtons with disabled submit button', () => {
    render(
      <ModalActionButtons
        submitText="Submit"
        handleCancel={onCancel}
        handleSubmit={onSubmit}
        isSubmitDisabled
      />,
    )

    const submitBtn = screen.getByRole('button', {name: /submit/i})

    expect(submitBtn).toBeDisabled()
  })

  it('handle onSubmit and onCancel', () => {
    render(
      <ModalActionButtons
        submitText="Submit"
        handleCancel={onCancel}
        handleSubmit={onSubmit}
      />,
    )

    const cancelBtn = screen.getByRole('button', {name: /cancel/i})
    const submitBtn = screen.getByRole('button', {name: /submit/i})

    userEvent.click(cancelBtn)
    userEvent.click(submitBtn)

    expect(onCancel).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledTimes(1)
  })
})
