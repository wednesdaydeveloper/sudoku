import * as React from 'react';

import NumberButton, {Props} from './NumberButton';

const Numbers = (props: Props) => {
  return (
    <div className="btn-group" role="group">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, ].map(num => <NumberButton key={num} {...props} num={num} />)}
    </div>
  );
};

export default Numbers;