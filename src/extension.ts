import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('extension.askRxJSBuddy', () => {
		const operators = [
			'switchMap',
			'flatMap',
			'mergeMap',
			'concatMap',
			'debounceTime',
			'auditTime',
			'throttleTime',
		];
		vscode.window.showQuickPick(operators).then(selectedOperator => {
			if (selectedOperator) {
				const { diagramLink, description, documentationLink } = getInfoForOperator(selectedOperator);
				if (diagramLink) {
					vscode.window.showInformationMessage(`${selectedOperator}: ${description}`, 'Diagram', 'Docs').then(selectedOption => {
						if (selectedOption) {
							if (selectedOption === 'Diagram') {
								showDiagram(diagramLink);
							} else {
								showDocs(documentationLink);
							}
						}
					});
				} else {
					vscode.window.showInformationMessage(`${selectedOperator}: ${description}`, 'Docs').then(selectedOption => {
						if (selectedOption) {
							showDocs(documentationLink);
						}
					});
				}
			}
		})
	});

	context.subscriptions.push(disposable);
}

function getInfoForOperator(operator: string) {
	let description = '';
	let diagramLink = '';
	let documentationLink = '';
	switch(operator) {
		case 'switchMap':
			diagramLink = 'https://rxjs-dev.firebaseapp.com/assets/images/marble-diagrams/switchMap.png';
			description = 'Projects each source value to an Observable which is merged in the output Observable, emitting values only from the most recently projected Observable.';
			documentationLink = 'https://rxjs-dev.firebaseapp.com/api/operators/switchMap';
			break;
		case 'flatMap':
			diagramLink = 'https://rxjs-dev.firebaseapp.com/assets/images/marble-diagrams/mergeMap.png';
			description = 'Projects each source value to an Observable which is merged in the output Observable.';
			documentationLink = 'https://rxjs-dev.firebaseapp.com/api/operators/flatMap';
		default:
	}
	return {
		description,
		diagramLink,
		documentationLink
	}
}

function createWebviewPanel(enableScripts = false) {
	return vscode.window.createWebviewPanel(
		'RxJS Buddy',
		'RxJS Buddy',
		vscode.ViewColumn.One,
		{
			enableScripts
		}
	);
}

function showDiagram(link: string) {
	const panel = createWebviewPanel();
	const webViewContent = `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>RxJS Buddy</title>
		</head>
		<body>
			<img src="${link}"/>
		</body>
		</html>`;
	panel.webview.html = webViewContent.trimLeft();
}

function showDocs(link: string) {
	const panel = createWebviewPanel(true);
	const webViewContent = `
		<!DOCTYPE html>
		<html>
		<body>
			<iframe src="${link}" width="100%" height="450px">
		</iframe>
		</body>
		</html>`;
	panel.webview.html = webViewContent.trimLeft();
}

export function deactivate() {}
