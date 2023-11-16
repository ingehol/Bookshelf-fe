export default function Lockout() {
    return(
        <div className="text-xl p-20">
            Nice try;)
            <br />
            Logg inn og prøv på ny!
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                <a href="/" className="font-medium text-primary-600 hover:underline dark:text-primary-500">{`-> Logg inn her <-`}</a>
            </p>
        </div>
    )
}