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
	let diagramLink = `https://rxjs-dev.firebaseapp.com/assets/images/marble-diagrams/${operator}.png`;
	let documentationLink = `https://rxjs-dev.firebaseapp.com/api/operators/${operator}`;
	switch(operator) {
		case 'switchMap':
			description = 'Projects each source value to an Observable which is merged in the output Observable, emitting values only from the most recently projected Observable.';
			break;
		case 'flatMap':
			diagramLink = 'https://rxjs-dev.firebaseapp.com/assets/images/marble-diagrams/mergeMap.png';
			description = 'Projects each source value to an Observable which is merged in the output Observable.';
			break;
		case 'mergeMap':
			description = 'Projects each source value to an Observable which is merged in the output Observable.';
			break;
		case 'concatMap':
			description = 'Projects each source value to an Observable which is merged in the output Observable, in a serialized fashion waiting for each one to complete before merging the next.';
			break;
		case 'debounceTime':
			description = 'Emits a value from the source Observable only after a particular time span has passed without another source emission.';
			break;
		case 'auditTime':
			description = 'Ignores source values for duration milliseconds, then emits the most recent value from the source Observable, then repeats this process.';
			break;
		case 'throttleTime':
			description = 'Emits a value from the source Observable, then ignores subsequent source values for duration milliseconds, then repeats this process.';
			break;
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
