import { getPayload } from 'payload';
import config from './src/config/payload.config.ts';

console.log('Attempting to call getPayload...');
console.log('Config has collections:', config.collections?.length);
console.log('Collections:', config.collections.map(c => c.slug));
console.log('\nUpload configs:');
config.collections.forEach(c => {
  if (c.upload) {
    console.log(`  ${c.slug}: has upload config`, Object.keys(c.upload));
  } else {
    console.log(`  ${c.slug}: no upload config`);
  }
});

try {
  const p = await getPayload({ config });
  console.log('\nSuccess! Payload instance created');
  console.log('Collections:', Object.keys(p.collections || {}));
  process.exit(0);
} catch (e) {
  console.error('\n=== FULL ERROR ===');
  console.error('Message:', e.message);
  console.error('Name:', e.name);
  console.error('\nStack trace:');
  console.error(e.stack);
  process.exit(1);
}

