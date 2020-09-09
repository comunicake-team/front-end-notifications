import React, { useState, useContext } from 'react';

const DialogContext = React.createContext();

const DialogContextProvider = ({ children }) => {
	const [{ Dialog, props }, setDialogConfig] = useState({
		Dialog: undefined,
		props: undefined,
	});

	const [dialogOpen, setDialogOpen] = useState(false);

	return (
		<DialogContext.Provider
			value={{
				showDialog: (Dialog, props) => {
					setDialogConfig({ Dialog, props });
					setDialogOpen(true);
				},
			}}
		>
			{children}
			{Dialog && (
				<Dialog
					open={dialogOpen}
					onClose={() => {
						setDialogOpen(false);
						setDialogConfig({
							Dialog: undefined,
							props: undefined,
						});
					}}
					{...props}
				/>
			)}
		</DialogContext.Provider>
	);
};

const useDialogContext = () => useContext(DialogContext);

export { useDialogContext, DialogContextProvider };
