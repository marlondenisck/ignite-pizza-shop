import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { OrderStatus } from './order-status'

describe('OrderStatus', () => {
  it('should display the right text based on order status when pending', () => {
    const wrapper = render(<OrderStatus status='pending' />)

    // pegar o elemento de texto que contém "Pendente"
    const statusText = wrapper.getByText('Pendente')
    console.log(statusText.outerHTML)
    // pegar a badge
    // const badge = wrapper.getByTestId('badge')
    // console.log(badge.outerHTML)

    // verificar se o texto está no documento
    expect(statusText).toBeInTheDocument()
    // verificar se o badge está com a classe correta
    // expect(badge).toHaveClass('bg-slate-400')
  })

  it('should display the right text based on order status when canceled', () => {
    const wrapper = render(<OrderStatus status='canceled' />)
    const statusText = wrapper.getByText('Cancelado')

    expect(statusText).toBeInTheDocument()
  })

  it('should display the right text based on order status when processing', () => {
    const wrapper = render(<OrderStatus status='processing' />)
    const statusText = wrapper.getByText('Em preparo')

    expect(statusText).toBeInTheDocument()
  })

  it('should display the right text based on order status when delivering', () => {
    const wrapper = render(<OrderStatus status='delivering' />)
    const statusText = wrapper.getByText('Em entrega')

    expect(statusText).toBeInTheDocument()
  })

  it('should display the right text based on order status when delivered', () => {
    const wrapper = render(<OrderStatus status='delivered' />)
    const statusText = wrapper.getByText('Entregue')

    expect(statusText).toBeInTheDocument()
  })

  it('should display the correct status indicator color for pending status', () => {
    const { container } = render(<OrderStatus status='pending' />)
    const indicator = container.querySelector('.bg-slate-400')

    expect(indicator).toBeInTheDocument()
  })

  it('should display the correct status indicator color for canceled status', () => {
    const { container } = render(<OrderStatus status='canceled' />)
    const indicator = container.querySelector('.bg-rose-500')

    expect(indicator).toBeInTheDocument()
  })

  it('should display the correct status indicator color for delivered status', () => {
    const { container } = render(<OrderStatus status='delivered' />)
    const indicator = container.querySelector('.bg-emerald-500')

    expect(indicator).toBeInTheDocument()
  })

  it('should display the correct status indicator color for processing status', () => {
    const { container } = render(<OrderStatus status='processing' />)
    const indicator = container.querySelector('.bg-amber-500')

    expect(indicator).toBeInTheDocument()
  })

  it('should display the correct status indicator color for delivering status', () => {
    const { container } = render(<OrderStatus status='delivering' />)
    const indicator = container.querySelector('.bg-amber-500')

    expect(indicator).toBeInTheDocument()
  })
})
