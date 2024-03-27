
document.getElementById("myButton").addEventListener("click", async () => {
    document.getElementById("myResponse").innerText = "loading...";
    const textContent = await executeInTab(() => document.documentElement.innerText);
    document.getElementById("myResponse").innerText = textContent;
});

/**
 * Executes a given function within the context of the currently active tab.
 * @async
 * @function executeInTab
 * @param {Function} functionToExecuteInTab - The function to be executed in the current tab.
 * @returns {Promise<*>} - The result of the executed script as a promise.
 */
async function executeInTab(functionToExecuteInTab) {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const tabId = tab.id;
    const result = (await chrome.scripting.executeScript({
        target: { tabId },
        function: functionToExecuteInTab,
    }))[0]["result"];
    return result;
}