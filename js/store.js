import { emptyItemQuery } from './item.js';

export default class Store {

	constructor(name, callback) {
		const localStorage = window.sessionStorage;

		let liveTodos;

		this.getLocalStorage = () => {
			return liveTodos || JSON.parse(localStorage.getItem(name) || '[]');
		};

		this.setLocalStorage = (todos) => {
			localStorage.setItem(name, JSON.stringify(liveTodos = todos));
		};

		if (callback) {
			callback();
		}
	}


	//A real project I would add a separate file that would manage my requests / response, and i can use promise\observable
//	getTask() {
  //      const url = require('https://jsonplaceholder.typicode.com/todos');
//		fetch(url)
	//		.then(function(response) {
	//			console.log(response.json())
	//		})
	//		.then(function(myJson) {
	//			console.log(myJson);
	//		});
	//}

	find(query, callback) {
		const todos = this.getLocalStorage();

		callback(todos.filter(todo => {
			for (let k in query) {
				if (query[k] !== todo[k]) {
					return false;
				}
			}
			return true;
		}));
	}

	update(update, callback) {
		const id = update.id;
		const todos = this.getLocalStorage();
		let i = todos.length;

		while (i--) {
			if (todos[i].id === id) {
				for (let k in update) {
					todos[i][k] = update[k];
				}
				break;
			}
		}

		this.setLocalStorage(todos);

		if (callback) {
			callback();
		}
	}

	insert(item, callback) {
		const todos = this.getLocalStorage();
		todos.push(item);

		this.setLocalStorage(todos);

		if (callback) {
			callback();
		}
	}

	remove(query, callback) {
		const todos = this.getLocalStorage().filter(todo => {
			for (let k in query) {
				if (query[k] === todo[k]) {
					return true;
				}
			}
			return false;
		});

		this.setLocalStorage(todos);

		if (callback) {
			callback(todos);
		}
	}

	count(callback) {
		this.find(emptyItemQuery, data => {
			const total = data.length;

			let i = total;
			let completed = 0;

			while (i--) {
				completed += data[i].completed;
			}
			callback(total, total - completed, completed);
		});
	}
}
