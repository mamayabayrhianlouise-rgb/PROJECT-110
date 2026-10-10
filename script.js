
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const loadingText = document.querySelector("#loading");
const errorMessage = document.querySelector("#errorMessage");
const getQuoteButton = document.querySelector("#getQuoteButton");
const copyButton = document.querySelector("#copyButton");
const quoteCountText = document.querySelector("#quoteCount");
const quoteBox = document.querySelector(".quote-display");

const API_URL = "https://dummyjson.com/quotes/random";
let quoteCount = 0;

async function getQuote() {
    loadingText.classList.remove("hidden");
    errorMessage.classList.add("hidden");
    getQuoteButton.disabled = true;

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        if (!data.quote?.trim() || !data.author?.trim())
            throw new Error("Missing quote");

        quoteText.textContent = data.quote;
        authorText.textContent = "— " + data.author;
        quoteCountText.textContent = ++quoteCount;

        quoteBox.classList.remove("pop");
        void quoteBox.offsetWidth;
        quoteBox.classList.add("pop");

    } catch (error) {
        errorMessage.textContent = "Could not fetch a quote. Please try again.";
        errorMessage.classList.remove("hidden");
        console.error(error);

    } finally {
        loadingText.classList.add("hidden");
        getQuoteButton.disabled = false;
    }
}

async function copyQuote() {
    if (!quoteCount) {
        copyButton.textContent = "GET A QUOTE FIRST";
    } else {
        try {
            await navigator.clipboard.writeText(
                quoteText.textContent + " " + authorText.textContent
            );
            copyButton.textContent = "COPIED! ✓";
        } catch (error) {
            copyButton.textContent = "COPY FAILED";
        }
    }

    setTimeout(() => copyButton.textContent = "COPY QUOTE", 1500);
}

getQuoteButton.addEventListener("click", getQuote);
copyButton.addEventListener("click", copyQuote);
