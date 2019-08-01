import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function getTodoLists(options) {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);
    options.method = 'GET';
    options.credentials = 'same-origin'

    return fetch(API_BASE_URL + "/lists", options)
    .then(response => 
        {
            return response.json();
        }
    )
  } 

  export function deleteTodoList(options, listId) {
      const headers = new Headers({
          'Content-Type': 'application/json',
      })
      
      if(localStorage.getItem(ACCESS_TOKEN)) {
          headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
      }
  
      const defaults = {headers: headers};
      options = Object.assign({}, defaults, options);
      options.method = 'DELETE';
      options.credentials = 'same-origin'
  
      return fetch(API_BASE_URL + "/lists/" + listId, options)
      .then(response => 
          {}
      )
    }

    export function addTodoList(options, listId, itemName) {
        let newItem = {
            name: itemName + ''
        }
      
        const headers = new Headers({
            'Content-Type': 'application/json',
        })
        
        if(localStorage.getItem(ACCESS_TOKEN)) {
            headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
        }
    
        const defaults = {headers: headers};
        options = Object.assign({}, defaults, options);
        options.method = 'POST';
        options.credentials = 'same-origin';
        options.body = JSON.stringify(newItem)
  
        return fetch(API_BASE_URL + "/lists", options)
        .then(response => 
            {
              return response.json();
            }
        )
      }    

export function getTodoItems(options, listId) {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);
    options.method = 'GET';
    options.credentials = 'same-origin'

    return fetch(API_BASE_URL + "/lists/" + listId + "/items", options)
    .then(response => 
        {
            return response.json();
        }
    )
  }  

export function deleteTodoItem(options, listId, itemId) {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);
    options.method = 'DELETE';
    options.credentials = 'same-origin'

    return fetch(API_BASE_URL + "/lists/" + listId + "/items/" + itemId, options)
    .then(response => 
        {}
    )
  }  

  export function updateTodoItem(options, listId, itemId, done, name) {
      let updatedItem = {
          completed: done,
          name: name
      }
    
      const headers = new Headers({
          'Content-Type': 'application/json',
      })
      
      if(localStorage.getItem(ACCESS_TOKEN)) {
          headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
      }
  
      const defaults = {headers: headers};
      options = Object.assign({}, defaults, options);
      options.method = 'PUT';
      options.credentials = 'same-origin';
      options.body = JSON.stringify(updatedItem);

      return fetch(API_BASE_URL + "/lists/" + listId + "/items/" + itemId, options)
      .then(response => 
          {
            return response;
          }
      )
    } 

    export function addTodoItem(options, listId, itemName) {
        let newItem = {
            name: itemName + ''
        }
      
        const headers = new Headers({
            'Content-Type': 'application/json',
        })
        
        if(localStorage.getItem(ACCESS_TOKEN)) {
            headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
        }
    
        const defaults = {headers: headers};
        options = Object.assign({}, defaults, options);
        options.method = 'POST';
        options.credentials = 'same-origin';
        options.body = JSON.stringify(newItem)
  
        return fetch(API_BASE_URL + "/lists/" + listId + "/items", options)
        .then(response => 
            {
              return response.json();
            }
        )
      }   