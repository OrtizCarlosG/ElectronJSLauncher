function logIn(ws, data)
{
    logInData = JSON.parse(data);
        if (logInData[1] === "Charles" && logInData[2] === "1234")
        {
            ws.name = logInData[1];
            return true;
        }
    return false;
}


module.exports = {
    logIn,
}