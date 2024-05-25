document.getElementsByTagName("button")[0].addEventListener("click", async () => {
    document.cookie = "jwt=; Path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.location.href = "/"
})