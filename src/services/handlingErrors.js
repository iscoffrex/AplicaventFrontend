const ERROR401 = (MySwal, logout, error) => {
    MySwal.fire({
        icon: "error",
        title: "Error",
        html: <h1>{error.response.data.msg}</h1>,
        timer: 3000,
        timerProgressBar: true,
    })
    setTimeout(() => {
        logout()
    }, 3000)
    throw error
}

export { ERROR401 }