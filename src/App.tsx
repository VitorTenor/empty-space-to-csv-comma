import React, {useState} from 'react';

function App() {
    const [headerValue, setHeaderValue] = useState('');
    const [fileName, setFileName] = useState('');

    const [csvInputValue, setCsvInputValue] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [outputValue, setOutputValue] = useState('');

    const handleHeaderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const title = event.target.value.trimEnd().replace(/,/g, ' ').split(' ').join(',');
        setHeaderValue(event.target.value);

        const finalValue = title.concat('\n').concat(inputValue);
        setOutputValue(finalValue);
    };

    const handleFileNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFileName(event.target.value.concat('.csv'));
        setCsvInputValue(event.target.value);
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        const formattedValue = value.split('\n')
            .map(line => line.trimEnd().split(' ').join(','))
            .join('\n');
        const finalValue = headerValue.concat('\n').concat(formattedValue);

        setInputValue(formattedValue);
        setOutputValue(finalValue);
    };

    const exportToCSV = () => {
        const blob = new Blob([outputValue], {type: 'text/csv;charset=utf-8;'});
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName || 'output.csv';
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
                    value={csvInputValue}
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