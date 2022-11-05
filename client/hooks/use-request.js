import axios from 'axios';
import { useState } from 'react';

export default ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async (props = {}) => {
    try {
      setErrors(null);

      const response = await axios[method](url, { ...body, ...props });

      if (onSuccess) {
        onSuccess();
      }

      return response.data;
    } catch (err) {
      setErrors(
        <div className="alert alert-danger mt-1">
          <h4>Ooops...</h4>
          <ul>
            {err.response.data.errors.map((e) => (
              <li key={e.field}>{e.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};
