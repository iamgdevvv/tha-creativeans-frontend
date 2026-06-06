'use client'
import { useCallback } from 'react'

export const useScrollFormError = () => {
	return useCallback((selector?: string) => {
		const domError = document.querySelector<HTMLElement>(selector || "[data-error='true']")

		if (domError) {
			setTimeout(() => {
				scrollTo({
					top: domError.offsetTop,
					behavior: 'smooth',
				})
			}, 100)
		}
	}, [])
}
