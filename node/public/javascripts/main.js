document.getElementById('set-btn').addEventListener('click', event => {
  let lat = document.getElementById('lat').value;
  let long = document.getElementById('long').value;

  if (lat && long) {
    fetch('/set', {
      method: 'post',
      body: JSON.stringify({ lat: lat, long: long }),
      headers: { 'Content-Type': 'application/json' },
    }).then(res => {
      console.log('success');
    }).catch(err => {
      console.log('error', err);
    });
  }

}, false);

