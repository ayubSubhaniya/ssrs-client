export const handleError = (error) => {
    if(error.statusText)
        alert(error.statusText);
    else if(error.responseText)
        alert(error.responseText);
    else
        alert("Something Went Wrong!");
}
