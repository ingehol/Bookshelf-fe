interface AlertProps {
    text: string
  }

const Alert: React.FC<AlertProps> = ({ text }) => {
    return (
        <div role="alert" className="absolute top-2 w-1/3 sm:max-w-md">
            <div className="border border-red-400 rounded bg-red-100 px-4 py-4 text-red-700">
                <p>{text}</p>
            </div>
        </div>
    )
}

export default Alert