import React, {useState} from 'react';

function App() {
    const FILE_NAME_KEY = 'FILE_NAME_KEY';
    const HEADER_VALUE_KEY = 'HEADER_VALUE_KEY';

    const [headerValue, setHeaderValue] = useState(localStorage.getItem(HEADER_VALUE_KEY) || '');
    const [fileName, setFileName] = useState(localStorage.getItem(FILE_NAME_KEY) || '');
    const [inputValue, setInputValue] = useState('');
    const [outputValue, setOutputValue] = useState('');

    const handleHeaderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const title = event.target.value.replace(/\s+/g, ',');
        setHeaderValue(event.target.value);

        localStorage.setItem(HEADER_VALUE_KEY, title);
        const finalValue = title.concat('\n').concat(inputValue);
        setOutputValue(finalValue);
    };

    const handleFileNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        localStorage.setItem(FILE_NAME_KEY, event.target.value);
        setFileName(event.target.value);
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        const formattedValue = value.split('\n').map(line => line.replace(/\s+/g, ',')).join('\n');
        const finalValue = headerValue.concat('\n').concat(formattedValue);

        setInputValue(formattedValue);
        setOutputValue(finalValue);
    };

    const exportToCSV = () => {
        const blob = new Blob([outputValue], {type: 'text/csv;charset=utf-8;'});
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName ? fileName.concat('.csv') : 'output.csv';
        link.click();
    };

    return (
        <>
            <header style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                width: '100vw'
            }}>
                <input
                    type="text"
                    placeholder="Enter CSV Title"
                    value={headerValue}
                    onChange={handleHeaderChange}
                    style={{
                        fontSize: "1.5rem",
                        width: "45%",
                        boxSizing: "border-box",
                    }}
                />
                <input
                    type="text"
                    placeholder="Enter CSV File Name"
                    value={fileName}
                    onChange={handleFileNameChange}
                    style={{
                        fontSize: "1.5rem",
                        width: "45%",
                        boxSizing: "border-box",
                    }}
                />
            </header>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                height: '90vh',
                width: '100vw'
            }}>
                <textarea
                    style={{
                        width: "45%",
                        height: "95%",
                        fontSize: "1.5rem",
                        textAlign: "center",
                        boxSizing: "border-box",
                        backgroundColor: "#242424",
                        color: "#fff",
                        border: "1px solid #ccc",
                        resize: "none",
                        overflow: "auto",
                    }}
                    onChange={handleChange}
                />
                <div style={{
                    width: "45%",
                    height: "95%",
                    fontSize: "1.5rem",
                    textAlign: "center",
                    border: "1px solid #ccc",
                    color: "#fff",
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "auto",
                }}>
                    <pre style={{width: "100%", height: "100%", margin: 0}}>
                        {outputValue}
                    </pre>
                    <button onClick={exportToCSV}
                            style={{
                                position: 'fixed',
                                bottom: '10px',
                                padding: '10px 20px',
                                fontSize: '1rem'
                            }}>
                        Export as CSV
                    </button>
                </div>
            </div>
        </>
    );
}

export default App;