module.exports = {
    // Posts the current year in the Footer
    current_year: () => {
        return `${new Date().getFullYear()}`;
    }
}