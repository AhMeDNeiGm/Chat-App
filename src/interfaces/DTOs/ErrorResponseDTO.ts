interface ErrorDetail {
  type: string
  msg: string
  path: string
  location: string
}

export default interface ErrorResponse {
  errors: ErrorDetail[]
  message?: string
}
