/*
    Copyright 2023 Hartbeat Track Club. All rights reserved.
    This file or parts thereof may not be reproduced in any form, stored in any retrieval system,
    or transmitted in any form by any means—electronic, mechanical, photocopy, recording, or
    otherwise, without prior written permission of Hartbeat Track Club, except as provided by
    United States of America copyright law and fair use.
    */

import { Link } from 'react-router-dom';
import { RootState, useAppSelector } from '../../redux/store';
import { capitalizeFullName } from '../../utils/capitalizeFullName';

const Home = () => {
  const { user, isLoading } = useAppSelector((state: RootState) => state.auth);

  return (
    <div>
      <h1>HOME</h1>
      {user && user.email !== null ? (
        <p>Welcome {capitalizeFullName(user.displayName ?? '')}</p>
      ) : (
        <p>
          <Link to='/login'>Please sign in!</Link>
        </p>
      )}
    </div>
  );
};

export default Home;
