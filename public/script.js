const form = document.getElementById("feedbackForm");

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const rating = document.getElementById("rating").value;
    const comment = document.getElementById("comment").value;

    try {

        const response = await fetch("/feedback", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: name,
                rating: Number(rating),
                comment: comment
            })
        });

        const data = await response.json();

        console.log(data);

        if (response.ok) {

            alert("Feedback submitted successfully!");

            form.reset();

        } else {

            alert("Something went wrong!");

        }

    } catch (error) {

        console.log("Error:", error);

        alert("Server error!");
    }
});