/*
    Copyright 2024 Hartbeat Track Club. All rights reserved.
    This file or parts thereof may not be reproduced in any form, stored in any retrieval system,
    or transmitted in any form by any means—electronic, mechanical, photocopy, recording, or
    otherwise, without prior written permission of Hartbeat Track Club, except as provided by
    United States of America copyright law and fair use.
    */

import { MainHero } from '..';

const AppRoutesContainer = ({ children: children }: { children: any }) => {
  return (
    <main className='flex flex-1 flex-col flex-grow mx-auto w-full items-center'>
      <MainHero textOne='Hartbeat' textTwo='Track Club' name='main' />
      {children}
    </main>
  );
};

export default AppRoutesContainer;
