// run.ts (Node.js + ts-node version)
// Chạy bài học theo tên bài (ví dụ: bai1_1)
// Cách dùng: npx ts-node run.ts bai1_1

import { FetchRequest } from "ethers";

// Tự động chuyển hướng RPC blastapi đã ngừng hoạt động sang public RPC khả dụng
// mà hoàn toàn không sửa đổi file test.ts của bài học
try {
    const defaultGetUrl = FetchRequest.createGetUrlFunc();
    FetchRequest.registerGetUrl(async (req, signal) => {
        if (req.url && req.url.includes("eth-sepolia.public.blastapi.io")) {
            const clone = req.clone();
            clone.url = "https://ethereum-sepolia-rpc.publicnode.com";
            return defaultGetUrl(clone, signal);
        }
        return defaultGetUrl(req, signal);
    });
} catch {}

const args = process.argv.slice(2);
if (args.length === 0) {
    console.log("❗ Vui lòng truyền tên bài học. Ví dụ:");
    console.log("   npx ts-node run.ts bai1_1");
    process.exit(1);
}

const lesson = args[0];
const path = `./lessons/${lesson}/test.ts`;

import(path)
    .then(() => {
        console.log(`✅ Đã chạy xong bài: ${lesson}`);
    })
    .catch((err) => {
        console.error(`❌ Không tìm thấy hoặc lỗi khi chạy ${path}`);
        console.error(err.message);
    });