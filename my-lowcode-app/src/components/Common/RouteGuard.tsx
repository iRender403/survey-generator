import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppDispatch } from '@/redux/hooks'
import { setSelectStatus } from '@/redux/schemaSlice'

export default function RouteGuard() {
  const location = useLocation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const lastSegment = location.pathname.split('/').pop()
    if (lastSegment && lastSegment !== 'select') {
      dispatch(setSelectStatus(lastSegment))
    }
  }, [location.pathname, dispatch])

  return null
}
