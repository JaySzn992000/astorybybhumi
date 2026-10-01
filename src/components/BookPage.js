import React from "react";

const BookPage = React.forwardRef((props, ref) => {

return (

<div className="page" ref={ref}>
{props.children}
</div>

);
});

export default BookPage;