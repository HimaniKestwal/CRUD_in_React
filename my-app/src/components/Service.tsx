export const getLocalStorage = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      try {
        const storedUserlist = JSON.parse(localStorage.getItem('userlist')!) || [];
        resolve(storedUserlist);
      } catch (error) {
        reject(error);
      }
    });
  };
  
  export const setLocalStorage = (data: any): Promise<string> => {
    return new Promise((resolve, reject) => {
      try {
        localStorage.setItem('userlist', JSON.stringify(data));
        resolve('Local storage updated successfully');
      } catch (error) {
        reject(error);
      }
    });
  };
  
  