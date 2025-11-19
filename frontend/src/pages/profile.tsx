import React from 'react';
import { User, Mail, Phone, MapPin, Edit, ChevronRight } from 'lucide-react'; 

interface UserProfileData {
    name: string;
    email: string;
    phone: string;
    address: string;
    major: string;
    studentId: string;
    avatarUrl?: string;
}

const userProfile: UserProfileData = {
    name: "Duong Pham Hong",
    email: "duong.ph@tuevents.com",
    phone: "+84 987 654 321",
    address: "Ho Chi Minh City, Vietnam",
    major: "Computer Science",
    studentId: "20201234",
    avatarUrl: undefined, // Không có avatar mặc định
};


// --- Component để hiển thị mỗi dòng thông tin ---
interface ProfileInfoItemProps {
    icon: React.ElementType; // Lucide icon
    label: string;
    value: string;
}

const ProfileInfoItem: React.FC<ProfileInfoItemProps> = ({ icon: Icon, label, value }) => (
    <div className="flex items-center space-x-4 p-4 border-b border-gray-100 last:border-b-0">
        {/* ĐÃ SỬA: flex-shrink-0 thành shrink-0 */}
        <Icon className="w-5 h-5 text-orange-500 shrink-0" />
        <div>
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <p className="text-base text-gray-900 font-semibold">{value}</p>
        </div>
    </div>
);


const Profile: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <main className="container mx-auto p-4 sm:p-6 lg:p-8 grow">
                
                <h1 className="text-3xl font-bold text-gray-800 mb-6 mt-2">
                    Profile
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Cột 1: Thông tin cơ bản & Avatar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 flex flex-col items-center">
                            {/* Avatar */}
                            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4 overflow-hidden">
                                {userProfile.avatarUrl ? (
                                    <img src={userProfile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-16 h-16 text-gray-500" />
                                )}
                            </div>
                            
                            {/* Tên và ID */}
                            <h2 className="text-2xl font-bold text-gray-900">{userProfile.name}</h2>
                            <p className="text-sm text-gray-500 mb-6">{userProfile.studentId} - {userProfile.major}</p>

                            {/* Nút Edit Profile */}
                            <button className="px-5 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition flex items-center">
                                <Edit className="w-4 h-4 mr-2" /> Edit Profile
                            </button>
                        </div>
                    </div>

                    {/* Cột 2 & 3: Chi tiết và Cài đặt */}
                    <div className="lg:col-span-2">
                        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Contact Information</h3>
                            
                            {/* Danh sách thông tin */}
                            <div className="divide-y divide-gray-100">
                                <ProfileInfoItem icon={Mail} label="Email Address" value={userProfile.email} />
                                <ProfileInfoItem icon={Phone} label="Phone Number" value={userProfile.phone} />
                                <ProfileInfoItem icon={MapPin} label="Address" value={userProfile.address} />
                            </div>
                        </div>

                        {/* Cài đặt chung */}
                        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 mt-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Account Settings</h3>
                            <div className="space-y-3">
                                <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition flex justify-between items-center text-gray-700 font-medium">
                                    Change Password
                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                </button>
                                <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition flex justify-between items-center text-gray-700 font-medium">
                                    Privacy Settings
                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                </button>
                                <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition flex justify-between items-center text-red-600 font-medium">
                                    Log Out
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

            </main>
        </div>
    );
}

export default Profile;