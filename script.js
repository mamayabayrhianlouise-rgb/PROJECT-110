const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const loadingText = document.getElementById("loading");
const errorMessage = document.getElementById("errorMessage");

const getQuoteButton = document.getElementById("getQuoteButton");
const copyButton = document.getElementById("copyButton");
const quoteCountText = document.getElementById("quoteCount");
const quoteBox = document.querySelector(".quote-display");

const API_URL = "https://dummyjson.com/quotes/random";

let quoteCount = 0;

async function getQuote() {

    loadingText.classList.remove("hidden");

    errorMessage.classList.add("hidden");

    getQuoteButton.disabled = true;

    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("API request failed");
        }

        const data = await response.json();

        if (
            typeof data.quote !== "string" ||
            !data.quote.trim() ||
            typeof data.author !== "string" ||
            !data.author.trim()
        ) {
            throw new Error("Quote information is missing");
        }

        showQuote(data.quote, data.author);

    } catch (error) {

        errorMessage.textContent =
            "Could not fetch a quote. Please check your internet connection and try again.";

        errorMessage.classList.remove("hidden");

        console.error("Error fetching quote:", error);

    } finally {

        loadingText.classList.add("hidden");

        getQuoteButton.disabled = false;
    }
}

function showQuote(quote, author) {

    quoteText.textContent = quote;
    authorText.textContent = "— " + author;

    quoteCount++;

    quoteCountText.textContent = quoteCount;

    quoteBox.classList.remove("pop");

    void quoteBox.offsetWidth;

    quoteBox.classList.add("pop");
}

async function copyQuote() {

    if (quoteCount === 0) {

        copyButton.textContent = "GET A QUOTE FIRST";

        setTimeout(function () {
            copyButton.textContent = "COPY QUOTE";
        }, 1500);

        return;
    }

    const fullText =
        quoteText.textContent + " " + authorText.textContent;

    try {
        await navigator.clipboard.writeText(fullText);

        copyButton.textContent = "COPIED! ✓";

    } catch (error) {

        copyButton.textContent = "COPY FAILED";

        console.error("Error copying quote:", error);
    }

    setTimeout(function () {
        copyButton.textContent = "COPY QUOTE";
    }, 1500);
}

if (getQuoteButton) {
    getQuoteButton.addEventListener("click", getQuote);
}

if (copyButton) {
    copyButton.addEventListener("click", copyQuote);
}
