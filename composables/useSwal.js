import Swal from 'sweetalert2'

export const useSwal = () => {
  const success = (title, message = '') => {
    return Swal.fire({
      icon: 'success',
      title,
      text: message,
      confirmButtonColor: '#16a34a',
    })
  }

  const error = (title, message = '') => {
    return Swal.fire({
      icon: 'error',
      title,
      text: message,
      confirmButtonColor: '#16a34a',
    })
  }

  const warning = (title, message = '') => {
    return Swal.fire({
      icon: 'warning',
      title,
      text: message,
      confirmButtonColor: '#16a34a',
    })
  }

  const confirm = (title, message = '') => {
    return Swal.fire({
      icon: 'question',
      title,
      text: message,
      showCancelButton: true,
      confirmButtonColor: '#16a34a',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
    })
  }

  const loading = (title = 'Processing...', message = 'Please wait') => {
    return Swal.fire({
      title,
      text: message,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading()
      }
    })
  }

  const close = () => {
    Swal.close()
  }

  const toastSuccess = (title) => {
    return Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      icon: 'success',
      title: title
    })
  }

  const toastError = (title) => {
    return Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      icon: 'error',
      title: title
    })
  }

  const toastWarning = (title) => {
    return Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      icon: 'warning',
      title: title
    })
  }

  return { success, error, warning, confirm, loading, close, toastSuccess, toastError, toastWarning }
}