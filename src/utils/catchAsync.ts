export default (fn: any, reject: any) => async () => {
  try {
    fn()
  } catch (error: any) {
    return reject(String(error.message))
  }
}